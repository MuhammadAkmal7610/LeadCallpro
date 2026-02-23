import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { supabase } from '../../lib/supabaseClient';
import { useAuth } from '../../context/AuthContext';
import Logo from '../../assets/Logo.png';
import { getAuthErrorMessage } from '../../utils/authErrors';

const Signup = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [step, setStep] = useState(() => parseInt(localStorage.getItem('signup_step')) || 1);
    const [loading, setLoading] = useState(false);
    const [fade, setFade] = useState(true);

    // Form State (Initialize from LocalStorage)
    const [orgName, setOrgName] = useState(() => localStorage.getItem('signup_orgName') || '');
    const [email, setEmail] = useState(() => localStorage.getItem('signup_email') || '');
    const [emailOtp, setEmailOtp] = useState('');
    const [phone, setPhone] = useState(() => localStorage.getItem('signup_phone') || '');
    const [phoneOtp, setPhoneOtp] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // PERSISTENCE: Save to LocalStorage on change
    useEffect(() => {
        localStorage.setItem('signup_step', step);
        localStorage.setItem('signup_orgName', orgName);
        localStorage.setItem('signup_email', email);
        localStorage.setItem('signup_phone', phone);
    }, [step, orgName, email, phone]);

    // REDIRECT / AUTO-ADVANCE LOGIC
    useEffect(() => {
        if (user) {
            // Case 1: Fully Registered -> Dashboard
            if (user.user_metadata?.signup_completed) {
                navigate('/dashboard', { replace: true });
            }
            // Case 2: Authenticated but Incomplete (Email Verified)
            else {
                // If currently on "Org/Email" steps (<3) OR incorrectly on "Done" step (5)
                // We advance/reset them to Step 3 (Phone) to continue the flow
                if (step < 3 || step === 5) {
                    // Recover org name if missing
                    if (!orgName && user.user_metadata?.org_name) {
                        setOrgName(user.user_metadata.org_name);
                    }
                    setStep(3);
                }
            }
        }
        // Case 3: NOT Authenticated but on a protected step (> 2.5)
        // This happens if session expires or user clears cookies but keeps localStorage
        else if (step > 2.5) {
            setStep(1);
        }
    }, [user, navigate, step, orgName]);

    // Animation helper
    const nextStep = (next) => {
        setFade(false);
        setTimeout(() => {
            setStep(next);
            setFade(true);
        }, 200);
    };

    // --- Timeline Data ---
    const steps = [
        { id: 1, label: "Org" },
        { id: 2, label: "Email" },
        { id: 3, label: "Phone" },
        { id: 4, label: "Secure" },
        { id: 5, label: "Done" }
    ];

    const canJumpTo = (targetStep) => {
        // Allow going back to any previous step
        // Allow going forward only if specific conditions met (complex, so restricting to history for now)
        return targetStep < Math.floor(step);
    };

    const jumpToStep = (targetStep) => {
        if (canJumpTo(targetStep)) {
            setFade(false);
            setTimeout(() => {
                setStep(targetStep);
                setFade(true);
            }, 200);
        }
    };

    // --- STEP 1: Organization ---
    const handleOrgSubmit = (e) => {
        e.preventDefault();
        if (!orgName.trim()) return toast.error("Organization name is required");
        nextStep(2);
    };

    // --- STEP 2: Email Verification ---
    const sendEmailOtp = async (e) => {
        e.preventDefault();
        // SANITIZE: Trim whitespace and lowercase email
        const cleanEmail = email.trim().toLowerCase();

        if (!cleanEmail) return toast.error("Email is required");
        if (cleanEmail !== email) setEmail(cleanEmail); // Update UI with clean email

        setLoading(true);
        const toastId = toast.loading("Sending verification code...");

        try {
            const { error } = await supabase.auth.signInWithOtp({
                email: cleanEmail,
                options: { shouldCreateUser: true }
            });
            if (error) throw error;
            toast.success("Code sent! Check spam folder.", { id: toastId });
            nextStep(2.5);
        } catch (error) {
            toast.error(getAuthErrorMessage(error), { id: toastId });
        } finally {
            setLoading(false);
        }
    };

    // --- STEP 2.5: Verify Email OTP ---
    const verifyEmailOtp = async (e, otpValue) => {
        if (e) e.preventDefault();
        const cleanEmail = email.trim().toLowerCase();
        const cleanOtp = (otpValue || emailOtp).trim();

        if (cleanOtp.length < 6 || cleanOtp.length > 8) {
            return toast.error("Please enter the full code");
        }

        setLoading(true);
        const toastId = toast.loading("Verifying...");

        try {
            const { error } = await supabase.auth.verifyOtp({
                email: cleanEmail,
                token: cleanOtp,
                type: 'email'
            });
            if (error) throw error;

            // INCREMENTAL SAVE: Save Organization Name to DB immediately after login
            await supabase.auth.updateUser({
                data: { org_name: orgName, full_name: orgName }
            });

            toast.success("Email verified successfully", { id: toastId });
            nextStep(3);
        } catch (error) {
            toast.error(getAuthErrorMessage(error), { id: toastId });
        } finally {
            setLoading(false);
        }
    };

    const handleOtpChange = (e) => {
        const val = e.target.value;
        setEmailOtp(val);
        if (val.length === 8) {
            verifyEmailOtp(null, val);
        }
    };

    // --- STEP 3: Phone Input (Uniqueness Check) ---
    const handlePhoneSubmit = async (e) => {
        e.preventDefault();
        if (!phone) return toast.error("Phone number is required");

        setLoading(true);
        const toastId = toast.loading("Verifying number...");

        try {
            // 1. UNIQUE CHECK: Query public.profiles
            // Note: This relies on the 'profiles' table and RLS policies being set up by the user via SQL script.
            const { count, error: checkError } = await supabase
                .from('profiles')
                .select('id', { count: 'exact', head: true })
                .eq('phone', phone)
                .neq('id', user.id); // Exclude self if updating

            if (checkError) throw checkError;

            if (count > 0) {
                // If count > 0, someone else has this number
                throw new Error("This phone number is already registered.");
            }

            // 2. RESERVE / SAVE: Update Auth Metadata (triggers sync to profiles)
            // Or explicitly upsert to profiles to be safe
            const { error: updateError } = await supabase.auth.updateUser({
                data: { phone: phone }
            });

            if (updateError) throw updateError;

            // Explicitly sync to profiles now just to be sure (in case trigger fails or doesn't exist yet)
            await supabase.from('profiles').upsert({
                id: user.id,
                phone: phone,
                updated_at: new Date()
            });

            toast.success("Phone verified", { id: toastId });
            nextStep(4);
        } catch (error) {
            console.error("Phone verification failed:", error);
            toast.error(error.message || "Failed to verify phone", { id: toastId });
        } finally {
            setLoading(false);
        }
    };

    // --- STEP 4: Password Creation ---
    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) return toast.error("Passwords do not match");
        if (password.length < 6) return toast.error("Password must be at least 6 characters");

        setLoading(true);
        const toastId = toast.loading("Securing account...");

        try {
            const { error } = await supabase.auth.updateUser({
                password: password,
                data: {
                    full_name: orgName,
                    org_name: orgName,
                    phone: phone,
                    signup_completed: true // MARK AS COMPLETE
                }
            });
            if (error) throw error;

            toast.success("Account created successfully", { id: toastId });
            nextStep(5);
        } catch (error) {
            toast.error(getAuthErrorMessage(error), { id: toastId });
        } finally {
            setLoading(false);
        }
    };

    // --- STEP 5: Credentials Download ---
    const downloadCredentials = () => {
        const toastId = toast.loading("Generating PDF...");

        // Helper to convert image/SVG to Base64 PNG for jsPDF
        const getBase64Image = (url) => {
            return new Promise((resolve, reject) => {
                const img = new Image();
                img.crossOrigin = 'Anonymous';
                img.src = url;
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    canvas.width = img.width;
                    canvas.height = img.height;
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0);
                    resolve(canvas.toDataURL('image/png'));
                };
                img.onerror = (e) => resolve(null);
            });
        };

        const logoUrl = "https://mvvtprxlrpmlpqkbqhfc.supabase.co/storage/v1/object/public/branding/Logo.png";

        getBase64Image(logoUrl).then(logoData => {
            import('jspdf').then(({ default: jsPDF }) => {
                const doc = new jsPDF();
                const bgDark = '#0f172a'; // slate-900
                const cardBg = '#1e293b'; // slate-800
                const textWhite = '#f8fafc'; // slate-50
                const textTeal = '#14b8a6'; // teal-500
                const textGray = '#94a3b8'; // slate-400

                // 1. LAYER: BACKGROUNDS
                // Page
                doc.setFillColor(bgDark);
                doc.rect(0, 0, 210, 297, 'F');
                // Header
                doc.setFillColor(cardBg);
                doc.rect(0, 0, 210, 40, 'F');
                // Card
                doc.setDrawColor('#334155');
                doc.setFillColor(cardBg);
                doc.roundedRect(20, 70, 170, 120, 3, 3, 'FD');

                // 2. LAYER: WATERMARK (Overlays backgrounds)
                doc.setTextColor('#334155');
                doc.setFontSize(30);
                doc.setFont('helvetica', 'bold');

                doc.saveGraphicsState();
                doc.setGState(new doc.GState({ opacity: 0.2 })); // Visible but subtle

                // Dense Grid
                for (let x = 0; x < 4; x++) {
                    for (let y = 0; y < 8; y++) {
                        doc.text("WEWAVE", 20 + (x * 70), 30 + (y * 40), { align: 'center', angle: 45 });
                    }
                }
                doc.restoreGraphicsState();

                // 3. LAYER: CONTENT (High Visibility)

                // Logo & Title Alignment
                if (logoData) {
                    try {
                        // Logo: Tighter interaction with text
                        doc.addImage(logoData, 'PNG', 20, 10, 20, 20); // Center Y=20
                    } catch (e) { console.error("PDF Logo Error", e); }
                }

                doc.setFontSize(48);
                doc.setTextColor(textTeal);
                // Text: Aligned visually with Logo center
                doc.text("WeWave", 43, 27.5);

                // Page Title
                doc.setFontSize(14);
                doc.setTextColor(textGray);
                doc.text("CONFIDENTIAL ACCOUNT CREDENTIALS", 20, 60);

                // Card Fields
                const addField = (label, value, y) => {
                    doc.setFontSize(10);
                    doc.setTextColor(textGray);
                    doc.text((label || '').toUpperCase(), 35, y);
                    doc.setFontSize(14);
                    doc.setTextColor(textWhite);
                    doc.text((value || '-').toString(), 35, y + 8);
                };

                addField("Organization", orgName, 90);
                addField("User Email", email, 115);
                addField("Phone Number", phone, 140);
                addField("Account Status", "VERIFIED", 165);

                // Footer
                doc.setFontSize(9);
                doc.setTextColor(textGray);
                doc.text(`Generated: ${new Date().toLocaleString()}`, 20, 280);
                doc.text("Approved by WeWave Security Systems.", 20, 285);

                doc.save('wewave-credentials.pdf');
                toast.success("Downloading Credentials...", { id: toastId });

                // FINAL SUCCESS: Redirect to Homepage/Dashboard
                setTimeout(() => {
                    // Cleanup localstorage before leaving
                    localStorage.removeItem('signup_step');
                    localStorage.removeItem('signup_orgName');
                    localStorage.removeItem('signup_email');
                    localStorage.removeItem('signup_phone');

                    toast.success("Welcome to WeWave!");
                    navigate('/dashboard');
                }, 1000);
            });
        });
    };



    return (
        <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col items-center justify-center p-4 selection:bg-teal-500/30">
            {/* Ambient Background */}
            <div className="fixed inset-0 z-0 opacity-20 pointer-events-none">
                <div className="absolute inset-0" style={{
                    backgroundImage: 'radial-gradient(#0f766e 1px, transparent 1px)',
                    backgroundSize: '32px 32px'
                }}></div>
                <div className="absolute top-[-50%] left-[-20%] w-[80%] h-[80%] bg-teal-900/20 rounded-full blur-[120px] hue-rotate-15 animate-pulse"></div>
            </div>

            {/* Main Card */}
            <div className={`w-full max-w-[480px] z-10 transition-all duration-500 ease-out transform ${fade ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>

                {/* --- PREMIUM TIMELINE --- */}
                <div className="relative w-full max-w-[400px] mx-auto mb-12 px-2">
                    {/* Background Track */}
                    <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-800 rounded-full -translate-y-1/2 z-0"></div>

                    {/* Active Progress Fill */}
                    <div
                        className="absolute top-1/2 left-0 h-1 bg-gradient-to-r from-teal-600 to-teal-400 rounded-full -translate-y-1/2 z-0 transition-all duration-500 ease-out"
                        style={{ width: `${Math.min(((step - 1) / (steps.length - 1)) * 100, 100)}%` }}
                    ></div>

                    {/* Nodes */}
                    <div className="relative z-10 flex justify-between">
                        {steps.map((s) => {
                            const isPast = step > s.id;
                            const isActive = Math.abs(step - s.id) < 0.1; // Float safety
                            const isFuture = step < s.id;

                            return (
                                <div
                                    key={s.id}
                                    onClick={() => jumpToStep(s.id)}
                                    className={`flex flex-col items-center group relative ${isPast ? 'cursor-pointer' : 'cursor-default pointer-events-none'}`}
                                >
                                    <div
                                        className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-500 z-20
                                            ${isActive
                                                ? 'bg-slate-900 border-teal-500 text-teal-400 shadow-[0_0_20px_rgba(20,184,166,0.5)] scale-110'
                                                : isPast
                                                    ? 'bg-teal-500 border-teal-500 text-slate-900 scale-100'
                                                    : 'bg-slate-900 border-slate-700 text-slate-500' // Future
                                            }`}
                                    >
                                        {isPast ? (
                                            <svg className="w-5 h-5 font-bold" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                                        ) : (
                                            <span className={`text-sm font-bold ${isActive ? 'animate-pulse' : ''}`}>{s.id}</span>
                                        )}
                                    </div>

                                    {/* Tooltip/Label */}
                                    <div className={`absolute top-12 transition-all duration-300 transform whitespace-nowrap
                                        ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0'}
                                    `}>
                                        <span className={`text-xs font-semibold tracking-wider uppercase
                                            ${isActive ? 'text-teal-400' : 'text-slate-400'}
                                        `}>
                                            {s.label}
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Logo Area */}
                <div className="mb-8 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-slate-800 border border-slate-700 shadow-xl mb-6 group hover:scale-105 transition-transform duration-500">
                        <img src={Logo} alt="Logo" className="w-8 h-8 opacity-90 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <h1 className="text-4xl font-semibold tracking-tight text-white mb-3">
                        {step === 1 && "Get Started"}
                        {step === 2 && "Your Email"}
                        {step === 2.5 && "Check Inbox"}
                        {step === 3 && "Add Phone"}
                        {step === 4 && "Password"}
                        {step === 5 && "Complete"}
                    </h1>
                    <p className="text-slate-400 text-lg font-light">
                        {step === 1 && "Start your 14-day free trial"}
                        {step === 2 && "We'll verify your work email"}
                        {step === 2.5 && `Code sent to ${email}`}
                        {step === 3 && "For account security"}
                        {step === 4 && "Secure your account"}
                        {step === 5 && "Download your credentials"}
                    </p>
                </div>

                {/* Content Area */}
                <div className="bg-transparent">
                    {step === 1 && (
                        <form onSubmit={handleOrgSubmit}>
                            <div className="mb-8">
                                <label className="block text-sm font-medium text-slate-400 mb-2 ml-1">Company Name</label>
                                <input
                                    autoFocus
                                    type="text"
                                    required
                                    className="w-full px-5 py-4 bg-slate-800 border border-slate-700 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none text-white placeholder-slate-500 text-lg transition-all shadow-inner"
                                    value={orgName}
                                    onChange={e => setOrgName(e.target.value)}
                                    placeholder="Acme Inc."
                                    autoComplete="organization"
                                />
                            </div>
                            <button className="w-full py-4 bg-teal-600 text-white text-lg font-semibold rounded-full hover:bg-teal-500 transition-colors shadow-[0_4px_20px_rgba(20,184,166,0.2)]">
                                Continue
                            </button>
                        </form>
                    )}

                    {step === 2 && (
                        <form onSubmit={sendEmailOtp}>
                            <div className="mb-8">
                                <label className="block text-sm font-medium text-slate-400 mb-2 ml-1">Work Email</label>
                                <input
                                    autoFocus
                                    type="email"
                                    required
                                    className="w-full px-5 py-4 bg-slate-800 border border-slate-700 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none text-white placeholder-slate-500 text-lg transition-all shadow-inner"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    placeholder="name@company.com"
                                    autoComplete="email"
                                />
                            </div>
                            <div className="flex gap-4">
                                <button type="button" onClick={() => nextStep(1)} className="px-6 py-4 text-slate-500 hover:text-slate-200 transition-colors font-medium">Back</button>
                                <button type="submit" disabled={loading} className="flex-1 py-4 bg-teal-600 text-white text-lg font-semibold rounded-full hover:bg-teal-500 transition-colors shadow-[0_4px_20px_rgba(20,184,166,0.2)] disabled:opacity-50">
                                    {loading ? 'Sending...' : 'Continue'}
                                </button>
                            </div>
                        </form>
                    )}

                    {step === 2.5 && (
                        <form onSubmit={verifyEmailOtp}>
                            <div className="mb-10">
                                <label className="block text-sm font-medium text-slate-400 mb-4 text-center">Enter the 6-digit code sent to your email</label>
                                <input
                                    autoFocus
                                    type="text"
                                    required
                                    maxLength={8}
                                    className="w-full px-5 py-4 bg-slate-800 border border-slate-700 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none text-white placeholder-slate-600 text-4xl text-center tracking-[0.5em] font-light transition-all shadow-inner"
                                    value={emailOtp}
                                    onChange={handleOtpChange}
                                    placeholder="00000000"
                                />
                            </div>
                            <div className="flex gap-4">
                                <button type="button" onClick={() => nextStep(2)} className="px-6 py-4 text-slate-500 hover:text-slate-200 transition-colors font-medium">Back</button>
                                <button type="submit" disabled={loading} className="flex-1 py-4 bg-teal-600 text-white text-lg font-semibold rounded-full hover:bg-teal-500 transition-colors shadow-[0_4px_20px_rgba(20,184,166,0.2)] disabled:opacity-50">
                                    {loading ? 'Verifying...' : 'Verify Email'}
                                </button>
                            </div>
                        </form>
                    )}

                    {step === 3 && (
                        <form onSubmit={handlePhoneSubmit}>
                            <div className="mb-8">
                                <label className="block text-sm font-medium text-slate-400 mb-2 ml-1">Phone Number</label>
                                <input
                                    autoFocus
                                    type="tel"
                                    required
                                    className="w-full px-5 py-4 bg-slate-800 border border-slate-700 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none text-white placeholder-slate-500 text-lg transition-all shadow-inner"
                                    value={phone}
                                    onChange={e => setPhone(e.target.value)}
                                    placeholder="+1 (555) 000-0000"
                                    autoComplete="tel"
                                />
                            </div>
                            <div className="flex gap-4">
                                <button type="button" onClick={() => nextStep(2.5)} className="px-6 py-4 text-slate-500 hover:text-slate-200 transition-colors font-medium">Back</button>
                                <button type="submit" className="flex-1 py-4 bg-teal-600 text-white text-lg font-semibold rounded-full hover:bg-teal-500 transition-colors shadow-[0_4px_20px_rgba(20,184,166,0.2)]">
                                    Continue
                                </button>
                            </div>
                        </form>
                    )}

                    {step === 4 && (
                        <form onSubmit={handlePasswordSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-2 ml-1">Create Password</label>
                                <input
                                    autoFocus
                                    type="password"
                                    required
                                    className="w-full px-5 py-4 bg-slate-800 border border-slate-700 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none text-white placeholder-slate-500 text-lg transition-all shadow-inner"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    autoComplete="new-password"
                                />
                            </div>
                            <div className="mb-8">
                                <label className="block text-sm font-medium text-slate-400 mb-2 ml-1">Confirm Password</label>
                                <input
                                    type="password"
                                    required
                                    className="w-full px-5 py-4 bg-slate-800 border border-slate-700 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none text-white placeholder-slate-500 text-lg transition-all shadow-inner"
                                    value={confirmPassword}
                                    onChange={e => setConfirmPassword(e.target.value)}
                                    placeholder="••••••••"
                                    autoComplete="new-password"
                                />
                            </div>
                            <button type="submit" disabled={loading} className="w-full py-4 bg-teal-600 text-white text-lg font-semibold rounded-full hover:bg-teal-500 transition-colors shadow-[0_4px_20px_rgba(20,184,166,0.2)] disabled:opacity-50">
                                {loading ? 'Creating...' : 'Create Account'}
                            </button>
                        </form>
                    )}

                    {step === 5 && (
                        <div className="text-center py-4">
                            <div className="w-20 h-20 rounded-full bg-teal-500/20 mx-auto mb-8 flex items-center justify-center shadow-[0_0_40px_rgba(20,184,166,0.2)]">
                                <svg className="w-10 h-10 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                            </div>

                            <button
                                onClick={downloadCredentials}
                                className="w-full py-5 bg-slate-800 border border-slate-700 hover:border-teal-500/50 rounded-2xl flex items-center justify-between px-6 group transition-all duration-300 shadow-lg"
                            >
                                <div className="text-left">
                                    <span className="block text-slate-100 font-medium text-lg">Credentials.pdf</span>
                                    <span className="text-slate-500 text-sm">Download & Finish</span>
                                </div>
                                <div className="w-10 h-10 rounded-full bg-slate-700 group-hover:bg-teal-500 group-hover:text-white flex items-center justify-center transition-colors">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                                </div>
                            </button>
                        </div>
                    )}

                </div>

                {step === 1 && (
                    <p className="mt-12 text-center text-slate-500 text-sm">
                        Already have an account? <Link to="/login" className="text-teal-400 hover:underline">Sign in</Link>
                    </p>
                )}
            </div>
        </div>
    );
};

export default Signup;

import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    // ---- MOCK USER DEMO MODE ----
    const [user, setUser] = useState({
        id: 'mock-user-123',
        email: 'demo@wewave.com',
        user_metadata: { signup_completed: true, full_name: 'Demo User' },
        role: 'admin',
        full_name: 'Demo User'
    });
    const [loading, setLoading] = useState(false);

    /* --- COMMENTED OUT SYSTEM AUTHENTICATION
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check active sessions and sets the user
        supabase.auth.getSession().then(({ data: { session } }) => {
            if (session?.user) {
                fetchProfile(session.user);
            } else {
                setUser(null);
                setLoading(false);
            }
        });

        // Listen for changes on auth state (logged in, signed out, etc.)
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            if (session?.user) {
                fetchProfile(session.user);
            } else {
                setUser(null);
                setLoading(false);
            }
        });

        return () => subscription.unsubscribe();
    }, []);

    const fetchProfile = async (currentUser) => {
        try {
            const { data: profile, error } = await supabase
                .from('profiles')
                .eq('id', currentUser.id)
                .single();

            if (profile) {
                // Merge auth user with profile data (role, etc)
                setUser({ ...currentUser, ...profile });
            } else {
                setUser(currentUser);
            }

            // Real-time listener for profile changes (role updates, etc.)
            const channel = supabase
                .channel(`public:profiles:${currentUser.id}`)
                .on('postgres_changes',
                    {
                        event: 'UPDATE',
                        schema: 'public',
                        table: 'profiles',
                        filter: `id=eq.${currentUser.id}`
                    },
                    (payload) => {
                        console.log('Real-time profile update received:', payload);
                        const updatedProfile = payload.new;
                        setUser(prev => ({ ...prev, ...updatedProfile }));
                    }
                )
                .subscribe();

        } catch (error) {
            console.error("Error fetching profile:", error);
            setUser(currentUser);
        } finally {
            setLoading(false);
        }
    };
    --- */

    const signUp = async (email, password, data = {}) => {
        console.log('Mock AuthContext: signUp bypassed', { email });
        return { data: { user }, error: null };
        /* --- COMMENTED OUT BACKEND SIGNUP
        try {
            const res = await fetch('https://wewave-backend.onrender.com/api/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password, name: data.full_name || '' })
            });
            const result = await res.json();
            if (!res.ok) throw new Error(result.message || 'Signup failed');

            if (result.token && result.refresh_token) {
                await supabase.auth.setSession({
                    access_token: result.token,
                    refresh_token: result.refresh_token
                });
            }
            return { data: { user: result.user }, error: null };
        } catch (error) {
            console.error(error);
            return { data: null, error };
        }
        --- */
    };

    const signIn = async (email, password) => {
        console.log('Mock AuthContext: signIn bypassed', email);
        return { data: { user }, error: null };
        /* --- COMMENTED OUT BACKEND LOGIN
        try {
            const res = await fetch('https://wewave-backend.onrender.com/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            const result = await res.json();
            if (!res.ok) throw new Error(result.message || 'Login failed');

            if (result.token && result.refresh_token) {
                const { data, error } = await supabase.auth.setSession({
                    access_token: result.token,
                    refresh_token: result.refresh_token
                });
                if (error) throw error;
                return { data, error: null };
            } else {
                throw new Error("No session returned from backend");
            }
        } catch (error) {
            return { data: null, error };
        }
        --- */
    };

    const signOut = () => {
        console.log('Mock AuthContext: signOut bypassed');
        // return supabase.auth.signOut();
    };

    const value = {
        signUp,
        signIn,
        signOut,
        user,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

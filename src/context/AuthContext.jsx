import { createContext, useContext, useEffect, useState } from "react";
import supabase from "../lib/supabase";
import { toast } from "react-toastify";


const AuthContext = createContext();

function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [role, setRole] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchRole = async (userId) => {
        const { data, error } = await supabase
            .from("profiles")
            .select("role")
            .eq("id", userId)
            .single();

        if (error) {
            console.error(
                "Supabase error details:",
                error.message,
                error.details,
                error.hint
            );
            return null;
        }

        return data?.role ?? "user";
    };

    useEffect(() => {
        const applySession = async (session) => {
            setUser(session?.user ?? null);
            if (session?.user) {
                const r = await fetchRole(session.user.id);
                setRole(r);
            } else {
                setRole(null);
            }
            setLoading(false);
        };

        supabase.auth.getSession().then(({ data: { session } }) => {
            applySession(session);
        });

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            applySession(session);
        });

        const handleEmailConfirmation = async () => {
            const hashParams = new URLSearchParams(window.location.hash.substring(1));
            const accessToken = hashParams.get("access_token");
            const type = hashParams.get("type");

            if (accessToken && type === "email") {
                try {
                    const { data, error } = await supabase.auth.setSession({
                        access_token: accessToken,
                        refresh_token: hashParams.get("refresh_token"),
                    });

                    if (error) {
                        toast.error("Error confirming email:", error);
                    } else if (data.session) {
                        window.history.replaceState(null, "", window.location.pathname);
                    }
                } catch (error) {
                    toast.error("Error processing email confirmation:", error);
                }
            }
        };

        handleEmailConfirmation();

        return () => {
            subscription.unsubscribe();
        };
    }, []);

    useEffect(() => {
        if (!user?.email_confirmed_at) return;

        const createProfile = async () => {
            await supabase.from("profiles").upsert({
                id: user.id,
                email: user.email,
                role: user.user_metadata?.role ?? "user",
            });
        };

        createProfile();
    }, [user?.id]);

    // Only insert if the profile doesn't exist
    // const { data: existingProfile } = await supabase
    //   .from('profiles')
    //   .select('id')
    //   .eq('id', user.id)
    //   .single();

    // if (!existingProfile) {
    //   await supabase.from('profiles').insert({ id: user.id, ...otherData });
    // }

    return (
        <AuthContext.Provider value={{ user, role, loading }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
export default AuthProvider;

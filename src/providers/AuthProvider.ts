import { auth } from '../firebase';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    User,
} from 'firebase/auth';

class AuthProvider {
    private static instance: AuthProvider;
    private currentUser: User | null = null;

    private constructor() {
        // You can initialize onAuthStateChanged here to track user state changes
        onAuthStateChanged(auth, (user) => {
            this.currentUser = user;  // Store the current user when authentication state changes
        });
    }

    // Singleton pattern to get a single instance of the AuthProvider
    public static getInstance(): AuthProvider {
        if (!AuthProvider.instance) {
            AuthProvider.instance = new AuthProvider();
        }
        return AuthProvider.instance;
    }

    // Method to sign up a new user
    public async signUp(email: string, password: string): Promise<void> {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
        } catch (error) {
            throw new Error(`Error signing up`);
        }
    }

    // Method to log in a user
    public async login(email: string, password: string): Promise<void> {
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
            throw new Error(`Error logging in`);
        }
    }

    // Method to log out the current user
    public async logout(): Promise<void> {
        try {
            await signOut(auth);
        } catch (error) {
            throw new Error(`Error logging out`);
        }
    }

    // Get the current user
    public getCurrentUser(): User | null {
        return this.currentUser;
    }
}

export default AuthProvider;

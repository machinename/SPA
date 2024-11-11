import AuthProvider from "../providers/AuthProvider";

// // Define types for the form elements and event
// interface LoginFormElements extends HTMLFormControlsCollection {
//     email: HTMLInputElement;
//     password: HTMLInputElement;
// }

const Login: () => string = () => {
    // Define a function to handle form submission
    const handleSubmit = (event: Event): void => {
        event.preventDefault();

        const form = event.target as HTMLFormElement;
        const email = form.email.value;
        const password = form.password.value;

        // Call the sign-up method on form submission
        AuthProvider.getInstance().signUp(email, password)
            .then((response) => {
                console.log("User signed up:", response);
                // Optionally redirect the user or show a success message
            })
            .catch((error) => {
                console.error("Error signing up:", error);
                // Handle error (e.g., show an error message to the user)
            });
    };

    return `
        <h1>Login</h1>
        <p>Add a login form. I'm using Webpack without React or any frameworks, I'm also using an AuthProvider for authentication.</p>
        <form id="loginForm" onsubmit="handleSubmit(event)">
            <div>
                <label for="email">Email:</label>
                <input type="email" name="email" id="email" required />
            </div>
            <div>
                <label for="password">Password:</label>
                <input type="password" name="password" id="password" required />
            </div>
            <button type="submit">Sign Up</button>
        </form>
    `;
};

// Initialize AuthProvider sign-up (already done in your example)
AuthProvider.getInstance().signUp("email@gmail.com", "password")
    .then(response => console.log("Sign-up success:", response))
    .catch(error => console.error("Sign-up error:", error));

export default Login;

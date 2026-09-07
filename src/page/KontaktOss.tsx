import { useState } from "react";

interface ContactFormData {
    name: string;
    email: string;
    message: string;
    newsletterOption: boolean;
}

export function KontaktForm() {
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [message, setMessage] = useState<string>("");
    const [newsletterOption, setNewsletterOption] = useState<boolean>(false);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [validationError, setValidationError] = useState<string | null>(null);


    const handleTextChange =
    (setter: React.Dispatch<React.SetStateAction<string>>) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setter(event.target.value);
    };

    const handleTextAreaChange =
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setMessage(e.target.value);
    };

    const handleCheckboxChange =
    (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewsletterOption(e.target.checked);
    };
    
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSuccessMessage(null);
        setValidationError(null);

        if (!name.trim() || !email.trim() || !message.trim()) {
            setValidationError("Vennligst fyll ut alle felt.");
            return;
        }

        if (!email.includes("@")) {
            setValidationError("Vennligst oppgi en gyldig e-postadresse.");
            return;
        }

        const formData: ContactFormData = {
            name: name.trim(),
            email: email.trim(),
            message: message.trim(),
            newsletterOption: newsletterOption,
        };

        console.log("Form Data Submitted:", formData);
        setSuccessMessage("Meldingen din ble sendt!");
        setName("");
        setEmail("");
        setMessage("");
        setNewsletterOption(false);
    };

    return (
        <div style={{ padding: "2rem", maxWidth: "600px", margin: "0 auto", border: "1px solid #ccc", borderRadius: "8px" }}>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
        >
            <h2>Kontakt Oss</h2>
            {/* Success Message */}
            {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
            {/* Validation Error */}
            {validationError && <p style={{ color: "red" }}>{validationError}</p>}
            <label>
                Navn:
                <input type="text" value={name} onChange={handleTextChange(setName)} />
            </label>
            <label>
                E-post:
                <input type="email" value={email} onChange={handleTextChange(setEmail)} />
            </label>
            <label>
                Melding:
                <textarea value={message} onChange={handleTextAreaChange} />
            </label>
            <label>
                Meld meg på nyhetsbrevet:
                <input type="checkbox" checked={newsletterOption} onChange={handleCheckboxChange} />
            </label>
            <button type="submit" style={{ backgroundColor: "blue", color: "white", padding: "0.5rem 1rem", border: "none", borderRadius: "4px" }}>Send</button>
        </form>
        </div>
    );
}

            
function ErrorScreen({message}) {
    return (
        <div className="error-container">
            <h3>⚠️ Oops! Something went wrong</h3>
            <p>{message}</p>
        </div>
    );
};

export default ErrorScreen;
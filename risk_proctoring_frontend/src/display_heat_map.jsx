const HeatmapPage = () => {
    const clarityURL = "https://clarity.microsoft.com/projects/view/YOUR_API_KEY/impressions?date=Last%203%20days";
    
    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h2>Clarity Heatmap</h2>
            <button 
                onClick={() => window.open(clarityURL, "_blank")} 
                style={{ padding: "10px 20px", fontSize: "16px", cursor: "pointer" }}
            >
                Open Heatmap
            </button>
        </div>
    );
};

export default HeatmapPage;

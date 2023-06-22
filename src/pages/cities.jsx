import { Typography } from "@mui/material";

export default function Cities() {
    return (
        <>
            <div className="main">
                <Typography variant="h1" color="white" sx={{ textAlign: 'center', width: '85vw', backgroundColor: 'rgba(0, 0, 0, 0.651)', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
                    No cities found
                </Typography>
            </div>
        </>
    )
}
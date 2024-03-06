import React, { useState, useEffect } from 'react';

const QRCode = ({email}) => {


    const [qrCodeUrl, setQrCodeUrl] = useState('');


    // Dependencia en 'data' para regenerar el QR si cambia

    useEffect(() => {
        generateQRCode();
    }, []);

    const generateQRCode = async () => {
        try {
            const response = await fetch(`http://localhost:8090/code/generate/${email}`, {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Error al generar el QR');
            }

            const blob = await response.blob();
            const url = URL.createObjectURL(blob);
            setQrCodeUrl(url);
        } catch (error) {
            console.error('Error fetching QR code:', error);
        }
    };

    return (
        <div className={"flex flex-col justify-center"}>
             {qrCodeUrl && <img className={"h-auto max-w-lg mx-auto"} src={qrCodeUrl} alt="QR Code" />}
        </div>
    );
};

export default QRCode;
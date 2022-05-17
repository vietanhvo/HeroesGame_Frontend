import React from 'react';
import Image from 'next/image';

export default function AuthHeader() {
    return (
        <div className="header text-center">
            <a href="#" className="logo d-block">
                <Image src="/assets/images/pages/auth/hero-logo.png" width={256} height={111} />
            </a>
        </div>
    );
}

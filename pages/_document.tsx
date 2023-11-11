import { Head, Html, Main, NextScript } from 'next/document';
import React from 'react';

export default function Document() {
    return (
        <Html>
            <Head>
                {/* Modified meta[name="viewport"] tag with viewport-fit=cover */}
                <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
                <link href='https://fonts.googleapis.com/css?family=Lato:400,700' rel='stylesheet' type='text/css' />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}

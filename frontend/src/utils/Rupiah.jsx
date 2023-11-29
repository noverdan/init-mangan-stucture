import React from 'react';

export default function Rp(nilai) {
    return `Rp${nilai.toLocaleString('id-ID')}`;
}
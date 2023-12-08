import React from 'react';

export default function Rp(nilai = 0) {
    return `Rp${nilai.toLocaleString('id-ID')}`;
}
import type { CarData } from '../types';
import { useState, useEffect } from 'react';
import {DataGrid, type GridColDef} from '@mui/x-data-grid';

const columns: GridColDef[] = [
    { field: 'brand', headerName: 'Brand', width: 90 },
    { field: 'model', headerName: 'Model', width: 130 },
    { field: 'color', headerName: 'Color', width: 90 },
    { field: 'fuel', headerName: 'Fuel', width: 90 },
    { field: 'modelYear', headerName: 'ModelYear', width: 120 },
    { field: 'price', headerName: 'Price', width: 120 },
];

function CarList() { 
    const [cars, setCars] = useState<CarData[]>([]);

    const getCars = () => {
        fetch(import.meta.env.VITE_API_URL + '/cars')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error when fetching cars');
                }
                return response.json();
            })
            .then(data => {
                setCars(data._embedded?.cars ?? []);
            })
            .catch(error => {
                console.error('Error fetching cars:', error);
            });
    };

    useEffect(() => {
        getCars();
    }, []);

    return (
        <>
        <div style={{  width: '100%' , height: 400}}>
            
            <DataGrid
                rows={cars}
                columns={columns}
                    getRowId={(row) => row._links.self.href}
                
            />
        </div>
        </>
    );
}

export default CarList;
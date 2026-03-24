import type { CarData } from '../types';
import { useState, useEffect } from 'react';
import { DataGrid, type GridColDef, type GridRenderCellParams } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import AddCar from './AddCar';
import Stack from '@mui/material/Stack';


function CarList() {
    const [cars, setCars] = useState<CarData[]>([]);

    const columns: GridColDef[] = [
        { field: 'brand', headerName: 'Brand', width: 90 },
        { field: 'model', headerName: 'Model', width: 130 },
        { field: 'color', headerName: 'Color', width: 90 },
        { field: 'fuel', headerName: 'Fuel', width: 90 },
        { field: 'modelYear', headerName: 'ModelYear', width: 120 },
        { field: 'price', headerName: 'Price', width: 120 },
        {
            field: '_links.self.href',
            headerName: "",
            sortable: false,
            filterable: false,
            renderCell: (params: GridRenderCellParams) => (
                <Button
                    color="error"
                    size="small"
                    onClick={() => handleDelete(params.id as string)}>
                    Delete
                </Button>
            )
        }
    ];


    const getCars = () => {
        fetch(import.meta.env.VITE_API_URL + '/cars')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error when fetching cars');
                }
                return response.json();
            })
            .then(data => setCars(data._embedded?.cars))
            .catch(err => console.error(err))

    };

    const handleDelete = (url: string) => {
        if (window.confirm("Are you sure?")) {
            fetch(url, {
                method: 'DELETE'
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Error when deleting car');

                        return response.json();
                    }

                })
                .then(() => getCars())
                .catch(err => console.error('Error deleting car:', err));

        }
    }



    useEffect(() => {
        getCars();
    }, []);

    return (
        <>
            <Stack direction ="row"  sx={{ mb: 2, mt: 2 }}>
                <AddCar />
            </Stack>

            <div style={{ width: '100%', height: 400 }}>

                <DataGrid
                    rows={cars}
                    columns={columns}
                    getRowId={(row) => row._links.self.href}
                    autoPageSize
                    rowSelection={false}

                />
            </div>
        </>
    );
}


export default CarList;
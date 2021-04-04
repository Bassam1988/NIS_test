import React, { Fragment}from 'react';
import AddProductForm from './AddProductForm';
import Products from './Products';

export default function Dashboard() {
    return (
        <Fragment>
            <AddProductForm/>
            <Products/>
        </Fragment>
    )
}

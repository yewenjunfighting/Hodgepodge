import DocumentTitle from 'react-document-title'
import React from 'react'

function DetailPage() {
    return (
        <DocumentTitle title='a beautiful picture' />
    )
}

function HomePage() {
    return (
        <DocumentTitle title='Home'>
            <h1>Home, sweet home.</h1>
        </DocumentTitle>
    );
}


export  { DetailPage, HomePage }

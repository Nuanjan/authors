import React from 'react';

const Error = () => {
    return (
        <div>
            <h1>sorry, but we could not find the author you are looking for. Would you like to add this author to our database?</h1>
            <a href={"/new"}>Add an Author</a>
        </div>
    );
};

export default Error;
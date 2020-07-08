import React from 'react';

const Card = ({image,title,price}) => (
    <div class="max-w-sm h-64 lg:w-64 xl:max-w-sm rounded shadow-lg bg-gray-700 mx-auto items-center">
        <img class="w-full h-48" src={image} alt="" />
        <div class="px-6 py-2">
            <div class="font-bold text-sm mb-2 text-center text-gray-300">{title}</div>
            <div class="font-bold text-sm mb-2 text-center text-teal-300">{price}</div>
        </div>
    </div>
);

export default Card;
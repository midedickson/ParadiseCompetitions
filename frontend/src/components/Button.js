import React from "react";

export const PriButton = ({text}) => {
    return (
        <button class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-black mr-2 hover:bg-teal-300">{text}</button>
    )
}

export const SecButton = ({text}) => {
    return (
        <button class="inline-block bg-teal-300 text-black rounded-full px-3 py-1 text-sm font-semibold mr-2 hover:bg-gray-200">{text}</button>

    )
}

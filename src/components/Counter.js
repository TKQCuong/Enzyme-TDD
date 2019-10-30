import React, { useState } from 'react'

export default function Counter(props) {
const [number, setNumber] = useState(0)

const increment = () => {
    setNumber(number + 1)
}
    return (
        <div>
            <h2>Count</h2>
            <h1 className="count">{number}</h1>
            <button className="button" onClick={increment}>Increment</button>
        </div>
    )
}

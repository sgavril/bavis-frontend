import React from 'react';

  // Custom hook:
function Counter() {
    const [count, setCount] = React.useState(0);
    console.log("Current count: ", count);
    return (
      <div>
        <p>You clicked {count} times.</p>
        <button onClick={() => setCount(count+1)}>Click me</button>
      </div>
    );
}

// Custom useEffect hook
function EffectLogger() {
    const [count, setCount] = React.useState(0);
    React.useEffect(() => {
        console.log("Component did mount or update.")

        return () => {
        console.log("Cleanup: Component will unmount.");
        };
    }, [count]); // Effect runs each time the count changes
    return (
        <div>
        <button onClick={() => setCount(count+1)}>Increase count</button>
        </div>
    )

}


function App() {
    // Custom component: takes a prop and display, log to console
    function Greeting(props) {
        console.log("Greeting Component's props: ", props);
        return <h1>Hello, {props.name}!</h1>;
    }

    // const [searchTerm, setSearchTerm] = React.useState(
    //   localStorage.getItem('search') || 'frequent-words');
    // Trying a custom react hook
    const [searchTerm, setSearchTerm] = useSemiPersistentState('search', 'frequent')

    return (
        <div>

        <hr />

        <h1>Custom components for fun</h1>
        <Greeting name="Alice"/>
        <Counter></Counter>
        <EffectLogger></EffectLogger>

        </div>
    );
}
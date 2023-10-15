import React from 'react';
import logo from './logo.svg';
import './App.css';

const useSemiPersistentState = (key, initialState) => {
  const [value, setValue] = React.useState(
    localStorage.getItem('key') || initialState
  );

  React.useEffect(() => {
    localStorage.setItem(key, value);
  }, [value, key]);

  return [value, setValue];
};

function App() {
  const algorithms = [
    {
      title: 'pattern-count',
      url: 'https://rosalind.info/problems/ba1a/',
      author: 'Pevzner',
      num_comments: 3,
      points: 4,
      objectID: 0,
    },
    {
      title: 'frequent-words',
      url: 'https://github.com/ngthu003/Bioinformatics_Algorithms/blob/master/Chapter%201%20-%20Where%20in%20the%20Genome%20Does%20DNA%20Replication%20Begin/1B%20-%20Frequent%20Worlds%20Problem.ipynb',
      author: 'ngthu003',
      num_comments: 2,
      points: 5,
      objectID: 1,
    }
  ];

  // Custom component: takes a prop and display, log to console
  function Greeting(props) {
    console.log("Greeting Component's props: ", props);
    return <h1>Hello, {props.name}!</h1>;
  }

  // const [searchTerm, setSearchTerm] = React.useState(
  //   localStorage.getItem('search') || 'frequent-words');
  // Trying a custom react hook
  const [searchTerm, setSearchTerm] = useSemiPersistentState('search', 'frequent')

  // Handle side-effects at a centralized place
  // React.useEffect(() => {                       // useEffect takes two args:
  //   localStorage.setItem('search', searchTerm); // first is a fn that runs side-effect
  // }, [searchTerm]);                             // side-effect runs when 2nd arg changes



  // A - callback function is introduced
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    // C - callsback to the place it was introduced
    console.log(event.target.value);
  };

  const searchedAlgorithms = algorithms.filter((algorithm) =>
    algorithm.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1>Bioinformatics Algorithm Visualizer</h1>

      {/* B - callback function is used elsewhere */}
      <Search search={searchTerm} onSearch={handleSearch} searchTerm={searchTerm}/>

      <List list={searchedAlgorithms}/>

      <hr />

    </div>
  );
}

const Search = ({ search, onSearch }) => (
  <div>
    <label htmlFor="search">Search: </label>
    <input
      id="search"
      type="text"
      value={search}
      onChange={onSearch} />
    <p>
      Searching for <strong>{search}</strong>
    </p>
  </div>
);

const List = ({ list }) => (
  <ul>
    {list.map((item) => (
      <Item key={item.objectID} item={item}/>
    ))}
  </ul>
);

const Item = ({ item }) => (
  <li>
    <span>
      <a href={item.url}>{item.title}</a>
    </span>
    <span>{item.author}</span>
    <span>{item.num_comments}</span>
    <span>{item.points}</span>
  </li>
);


export default App;

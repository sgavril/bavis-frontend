import React from 'react';
import logo from './logo.svg';
import './App.css';

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

  const [searchTerm, setSearchTerm] = React.useState('enter search term...');

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

      <hr />

      <List list={searchedAlgorithms}/>
    </div>
  );
}

const Search = (props) => (
  <div>
    <label htmlFor="search">Search: </label>
    <input
      id="search"
      type="text"
      value={props.search}
      onChange={props.onSearch} />
    <p>
      Searching for <strong>{props.searchTerm}</strong>
    </p>
  </div>
);

const List = (props) => (
  <ul>
    {props.list.map((item) => (
      <Item key={item.objectID} item={item} />
    ))}
  </ul>
);

const Item = (props) => (
  <li>
    <span>
      <a href={props.item.url}>{props.item.title}</a>
    </span>
    <span>{props.item.author}</span>
  </li>
);


export default App;

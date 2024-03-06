import './App.css';
import { useState } from 'react';
import MovieBox from './MovieBox';
import NavigationBar from './NavigationBar';




function App() {

  const [searchQuery, setSearchQuery] = useState('');
  const [choosenCategory,setChoosenCategory] = useState(null);
  return (
    <div >
      <NavigationBar onSearch={setSearchQuery} choosen={setChoosenCategory}/>
      <MovieBox  searchQuery={searchQuery} choosenCategory={choosenCategory}/>
    </div>
  );
}

export default App;

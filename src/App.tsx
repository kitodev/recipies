import React, {useState, useEffect, FormEvent} from 'react';
import './App.css';
import { Recipe } from './Recipe';
import RecipeComponent from './RecipeComponent';

function App() {
  const [recipesFound, setRecipesFound] = useState<Recipe[]>([]);
  const [recipieSearch, setRecipeSearch] = useState('');

  const searchForRecipies = async (query: string): Promise<Recipe[]> => {
    const result = await fetch(`http://localhost:3001/?search=${query}`);
    return (await result.json()).results;
  }

  const search = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const input = form.querySelector('#searchText') as HTMLInputElement;
    setRecipeSearch(input.value);
  };

  useEffect(() => {
    (async () => {
      const query = encodeURIComponent(recipieSearch);
      if(query) {
        const response = await searchForRecipies(query);
        setRecipesFound(response);
      }
    })();
  }, [recipieSearch]);

  return (
    <div className="App">
      <h1>Recipe search</h1>
      <form className="searchForm" onSubmit={event => search(event)}>
        <input type="text" id="searchText" />
        <button>Search</button>
      </form>
      {recipieSearch && <p>Results for {recipieSearch}...</p>}

      <div className="recipe-container">
        {recipesFound.length &&
          recipesFound.map(recipe => 
            (<RecipeComponent key={recipe.href} recipe={recipe}></RecipeComponent>)
          )
        }
      </div>
    </div>
  );
}

export default App;

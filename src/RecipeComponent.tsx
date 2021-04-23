import { Recipe } from "./Recipe";


const RecipeComponent = (props: {recipe: Recipe}) => {
    const { recipe } = props;

    return(
        <div className="recipe">
            <div className="title">
                <img src={recipe.thumbnail || 'http://localhost:3000/logo192.png'} alt={recipe.title} />
                <p>{recipe.title}</p>
            </div>
            {recipe.ingredients &&
                <ul>
                    {recipe.ingredients.split(',').map(ingredient => 
                        <li>{ingredient}</li>
                    )}
                </ul>
            }
            <a href={recipe.href} target="_blank">View Recipe</a>
        </div>
    );
};

export default RecipeComponent;
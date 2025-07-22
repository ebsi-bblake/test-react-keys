import { useEffect, useState } from "react";

const App = () => {
  const [posts, setPosts] = useState([]);
  const [showWithKeys, setShowWithKeys] = useState(true);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts?_limit=5")
      .then((res) => res.json())
      .then(setPosts);
  }, []);

  useEffect(() => {
    if (posts.length > 0) {
      console.log(
        `Rendered ${posts.length} items ${showWithKeys ? "WITH" : "WITHOUT"} keys`
      );
    }
  }, [posts, showWithKeys]);

  return (
    <div>
      <h1>React Key Test</h1>
      <button onClick={() => setShowWithKeys(!showWithKeys)}>
        Toggle {showWithKeys ? "WITHOUT" : "WITH"} Keys
      </button>
      <ul>
        {posts.map((post) =>
          showWithKeys ? (
            <li key={post.id}>{post.title}</li>
          ) : (
            <li>{post.title}</li>
          )
        )}
      </ul>
    </div>
  );
};

export default App;

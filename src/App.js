import { useEffect, useState } from "react";

const App = () => {
  const [posts, setPosts] = useState([]);
  const [showWithKeys, setShowWithKeys] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts?_limit=5")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch posts");
        return res.json();
      })
      .then(setPosts)
      .catch((error) => {
        console.error("Error fetching posts:", error);
        setError(error.message);
      });
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
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      <p>Current mode: {showWithKeys ? "WITH Keys" : "WITHOUT Keys"}</p>
      <button
        onClick={() => {
          setShowWithKeys((prev) => {
            console.log("Toggling showWithKeys to:", !prev);
            return !prev;
          });
        }}
      >
        Toggle {showWithKeys ? "WITHOUT" : "WITH"} Keys
      </button>
      <ul>
        {posts.map((post, index) => {
          const render = showWithKeys ? (
            <li key={post.id}>{post.title}</li>
          ) : (
            <li>
              {console.warn(`Missing key prop for post ${index}: ${post.title}`) &&
                post.title}
            </li>
          );
          console.log(`Rendering post ${index} ${showWithKeys ? "with" : "without"} key`);
          return render;
        })}
      </ul>
    </div>
  );
};

export default App;

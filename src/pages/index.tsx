import React from 'react';

const Home: React.FC = () => {
  return (
    <div id="screen">
      <div id="screenborder">
        <div id="content">
          <pre>welcome to my super cool website
          </pre>
          <div id="igroup">
            <input 
              // onKeyDown="move(this)"
              // onkeyup="move(this)"
              type="text"
            />
            <div id="cursor">_</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;



const Header = (props) => {
  return (<>
    <h1>{props.title}</h1>
    </>)
}


const Body = (props) => {
  return (
    <div>
      <p>{props.parts[0].name} {props.parts[0].exercises}</p>
      <p>{props.parts[1].name} {props.parts[1].exercises}</p>
      <p>{props.parts[2].name} {props.parts[2].exercises}</p>

    </div>
  );
};
const Total = (props) => {
  return (<>
<p>Number of exercises{" "}
      {props.parts[0].exercises +
        props.parts[1].exercises +
        props.parts[2].exercises}</p> </>
  )
}



const App = () => {
    const info = {
      name: "Half Stack application development",
      parts: [
        {
          name: "Fundamentals of React",
          exercises: 10,
        },
        {
          name: "Using props to pass data",
          exercises: 7,
        },
        {
          name: "State of a component",
          exercises: 14,
        },
      ],
    };
  
  

  return (
    <div>
      <Header title={info.name} />
      <Body parts={info.parts} />

      <Total parts={info.parts} />

      
    </div>
  );
};

export default App;

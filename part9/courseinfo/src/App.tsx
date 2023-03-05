const App = () => {
  const courseName = "Half Stack application development";
  interface CoursePartBase {
    name: string;
    exerciseCount: number;
  }
  interface CoursePartBaseExt extends CoursePartBase {
    description: string;
  }
  interface CoursePartBasic extends CoursePartBaseExt {
    kind: "basic";
  }

  interface CoursePartGroup extends CoursePartBase {
    groupProjectCount: number;
    kind: "group";
  }

  interface CoursePartBackround extends CoursePartBaseExt {
    backroundMaterial: string;
    kind: "background";
  }

  interface Special extends CoursePartBaseExt {
    requirements: Array<string>;
    kind: "special";
  }

  type CoursePart =
    | CoursePartBasic
    | CoursePartGroup
    | CoursePartBackround
    | Special;

  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part",
      kind: "basic",
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      kind: "group",
    },
    {
      name: "Basics of type Narrowing",
      exerciseCount: 7,
      description: "How to go from unknown to string",
      kind: "basic",
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      backroundMaterial:
        "https://type-level-typescript.com/template-literal-types",
      kind: "background",
    },
    {
      name: "TypeScript in frontend",
      exerciseCount: 10,
      description: "a hard part",
      kind: "basic",
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      kind: "special",
    },
  ];

  const Header = ({ title }: { title: string }): JSX.Element => {
    return <h1>{title}</h1>;
  };
  const Part = ({ part }: { part: CoursePart }) => {
    const assertNever = (value: never): never => {
      throw new Error(
        `Unhandled discriminated union member: ${JSON.stringify(value)}`
      );
    };

    switch (part.kind) {
      case "basic":
        return (
          <p>
            {part.name}, {part.description}, {part.exerciseCount}
          </p>
        );
      case "group":
        return (
          <p>
            {part.name}, {part.exerciseCount}, {part.groupProjectCount}
          </p>
        );
      case "background":
        return (
          <p>
            {part.name}, {part.description}, {part.backroundMaterial}
          </p>
        );
      case "special":
        return (
          <div>
            {part.name} {part.description}
            {part.requirements.map((x) => x).join(",")}
          </div>
        );
      default:
        return assertNever(part);
    }
  };

  const Content = ({
    name,
    exerciseCount,
  }: {
    name: string;
    exerciseCount: number;
  }): JSX.Element => {
    return (
      <p>
        <b>
          {name} {exerciseCount}
        </b>
      </p>
    );
  };

  const Total = ({
    courseParts,
  }: {
    courseParts: Array<CoursePart>;
  }): JSX.Element => {
    return (
      <p>
        Number of exercises{" "}
        {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
      </p>
    );
  };

  return (
    <div>
      <Header title={courseName} />
      {courseParts.map((x) => (
        <>
          <Content name={x.name} exerciseCount={x.exerciseCount} />
          <Part part={x} />
        </>
      ))}
      <Total courseParts={courseParts} />
    </div>
  );
};

export default App;

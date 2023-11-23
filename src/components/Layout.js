import "../styles/layout.scss";

export default function Layout(props) {
  const { title, children } = props;
  return (
    <div className="layout">
      <h1>{title}</h1>
      <div>{props.children}</div>
    </div>
  );
}

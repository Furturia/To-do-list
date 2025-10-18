export default function Children(props) {
  return (
    <div>
      <input
        type="text"
        onInput={(e) => {
          props.setName(e.target.value);
        }}
      />
      {props.children}
    </div>
  );
}


export const If = ({ isTrue, thenRender, otherwise }) => {
  if (isTrue) {
    return thenRender();
  }
  if (otherwise) {
    return otherwise();
  }
  return false;
};

function Examples() {
  return (
    <>
      <If
        isTrue={2 + 2 === 5}
        thenRender={() => <div>Newspeak</div>}
        otherwise={() => <div>That's incorrect</div>}
      />
      <If isTrue={1 + 1 === 2} thenRender={() => <div>You and me</div>} />
    </>
  );
}

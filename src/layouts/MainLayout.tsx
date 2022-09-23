type Props = {
  children: React.ReactNode;
};

function MainLayout(props: Props) {
  return (
    <div className="main-layout-container">
      <div className="header">
        <h1>appsamurai assignment</h1>
      </div>
      {props.children}
    </div>
  );
}

export default MainLayout;

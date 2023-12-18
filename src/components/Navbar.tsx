const Navbar = () => {
  return (
    <div className="container mx-auto p-2 navbar">
      <div className="flex justify-between items-center">
        <div className="text-2xl font-semibold navbar-link">הבית של שני</div>
        <div className="flex gap-4">
          <div className="navbar-link">אני שני</div>
          <div className="navbar-link">מדיה</div>
          <div className="navbar-link">ספר הזכרונות</div>
          <div className="navbar-link">נרות לשני</div>
          <div className="navbar-link">צור קשר</div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

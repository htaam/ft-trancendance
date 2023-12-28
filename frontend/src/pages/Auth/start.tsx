
function Start() {
  const { user } = useAuth();
  const { path } = useLocation();
  const navigate = useNvigate();

  useEffect(() => {
    if (user === null) {
      navigate("/login");
    }
  })

  return (

  )
}
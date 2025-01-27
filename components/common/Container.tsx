const Container = ({ children }:{
  children: React.ReactNode
}) => {
return ( 
  <div
    className="
      max-w-[2520px]
      mx-auto
      md:px-0
      sm:px-0
      pl-50
      lg:pt-8
      pt-4
    "
  >
    {children}
  </div>
 );
}

export default Container;
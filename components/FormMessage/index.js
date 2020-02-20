 require("./_style.scss");

 const FormMessage = props => {
  var color = props.status + "Border"

  return (
    <div className={color}>
      <h1 className="">{props.message}</h1>
    </div>
  )
};

export default FormMessage;

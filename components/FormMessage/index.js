 require("./_style.scss");

 const FormMessage = props => {
  var color = props.status + "Border"

  return (
    <div className={color}>
      <p className="messageText">{props.message}</p>
    </div>
  )
};

export default FormMessage;

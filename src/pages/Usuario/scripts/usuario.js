import $ from 'jquery';

$(document).on("click",".btn-delete-user",function(){
    
    let id = $(this).attr("data-id");
   if(window.confirm("Você deseja deletar este cliente?")) 
   {
    //    alert(`${process.env.REACT_APP_API_URL}`);
       $.ajax({
            url: `${process.env.REACT_APP_API_URL}/sistema/usuarios/` + id,
            method: "DELETE",
            success:function(){
                alert("O usuário foi deletado com sucesso.");

                window.location.reload();
            },error:function(){
                alert("Ocorreu um erro e a página precisará ser recarregada.");
                // window.location.reload();
            }
       });
   }
});
import $ from 'jquery';

$(document).on("click",".btn-delete-user",function(){
    
    let id = $(this).attr("data-id");
   if(window.confirm("Você deseja deletar este cliente?")) 
   {
       $.ajax({
            url: "http://localhost:3003/sistema/usuarios/" + id,
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
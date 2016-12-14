
   /* activate the carousel */
   $("#modal-carousel").carousel({interval:false});

   /* change modal title when slide changes */
   $("#modal-carousel").on("slid.bs.carousel",function () {
        $(".modal-title")
        .html($(this)
        .find(".active img")
        .attr("title"));
   });

   /* when clicking a thumb */
   $(".row .thumbnail").click(function(){
    var content = $(".carousel-inner");
    var title = $(".modal-title");

    content.empty();
    title.empty();

    var id = this.id;
     var repo = $("#img-repo .item");
     var repoCopy = repo.filter("#" + id).clone();
     var active = repoCopy.first();

    active.addClass("active");
    title.html(active.find("img").attr("title"));
    content.append(repoCopy);

    // show the modal
    $("#modal-gallery").modal("show");
  });

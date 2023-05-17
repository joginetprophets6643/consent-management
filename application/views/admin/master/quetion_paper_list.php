<!-- DataTables -->

<link rel="stylesheet" href="<?= base_url() ?>assets/plugins/datatables/dataTables.bootstrap4.css"> 
<style type="text/css">
  #na_datatable1 thead th:nth-child(2) {
    width: 325.4px !important;
  }
  #na_datatable1 thead th:nth-child(3),
  #na_datatable1 thead th:nth-child(4) {
    width: 170.4px !important;
  }
  #na_datatable1 thead th:nth-child(5) {
    width: 192.4px !important;
  }
</style>


<!-- Content Wrapper. Contains page content -->

<div class="content-wrapper">

  <section class="content">

    <!-- For Messages -->

    <?php $this->load->view('admin/includes/_messages.php') ?>

    <div class="card">

      <div class="card-header border-0">

        <div class="d-inline-block">

          <!-- <h3 class="card-title"><i class="fa fa-list"></i>&nbsp; <?php //echo trans('establishment_type') ?> List</h3> -->

          <h3 class="card-title "><i class="fa fa-list"></i>&nbsp; Subject List&nbsp;(विषय सूची)</h3>

        </div>

          <div class="float-right d-none">

          <?php if($this->rbac->check_operation_permission('quetion_paper_add')): ?>

            <a href="<?= base_url('admin/master/quetion_paper_add'); ?>" class="btn btn-success">Add Subject &nbsp;(विषय जोड़ें)</a>

          <?php endif; ?>

        </div>

      </div>

    </div>

    <div class="card">

      <div class="card-body ">

        <div>
          <table id="na_datatable1" class="table table-bordered table-striped table-responsive" width="100%" style="border-collapse: collapse !important;">

          <thead>

            <tr>

              <th>#</th>

              <th>Exam Name</th>

              <th>Subject English Name</th>

              <th>Subject Hindi Name</th>

               <th>Subject Code</th>

              <th>Action</th>

            </tr>

          </thead>

        </table>
        </div>

      </div>

    </div>

  </section>  

</div>





<!-- DataTables -->

<script src="<?= base_url() ?>assets/plugins/datatables/jquery.dataTables.js"></script>

<script src="<?= base_url() ?>assets/plugins/datatables/dataTables.bootstrap4.js"></script>



<script>

$(document).ready(function () {

    window.setTimeout(function() {

         $("#consent_recieved").fadeTo(500, 0).slideUp(500, function(){

            $(this).remove();

            <?php unset($_SESSION['success'])?>

         });

      }, 4000);

});  

  //---------------------------------------------------

  var table = $('#na_datatable1').DataTable( {

    "processing": true,

    "serverSide": false,

    "ajax": "<?=base_url('admin/master/datatable_json')?>",

    "order": [[0,'asc']],

    // "columnDefs": [

    // { "targets": 0, "name": "id", 'searchable':true, 'orderable':true},

    // ]

  });

</script>
<!DOCTYPE html>
<html>

<head>
  <meta charset="UTF-8" />
  <title>Expressões regulares</title>
  <link rel="stylesheet" href="css/bootstrap.min.css" />
  <link rel="stylesheet" href="css/estilo.min.css" />
</head>

<body>
  <div class="container col-8 col-lg-8 col-sm-12">
    <h1 class="text-center text-white">Expressões regulares</h1>
    <form class="form">
      <div class="form-group">
        <label for="target" class="text-white">Texto</label>
        <input type="text" id="target" class="form-control form-control-sm" value="" autocomplete="off" required autofocus placeholder="Digite um texto" />
      </div>

      <div class="form-group">
        <label for="pattern" class="text-white">Pattern (expressão regular)</label>
        <input type="text" id="pattern" class="form-control form-control-sm" value="" autocomplete="off" required placeholder="Digite um pattern" />
      </div>

      <div class="form-group">
        <button class="btn btn-primary btn-sm" onclick="executa(event)">
          Executar Regex
        </button>
      </div>

      <div class="form-row justify-content-start px-1">
        <div class="custom-control custom-checkbox form-check-inline">
          <input type="checkbox" class="custom-control-input" id="mostraIndex" value="true">
          <label class="custom-control-label text-white py-1" for="mostraIndex">Mostra índice</label>
        </div>
      </div>



      <div class="form-group">
        <label for="resultado" id="labelResultados" class="text-white">Matches (resultados)</label>
        <input type="text" id="resultado" class="form-control form-control-sm" value="" readonly />
      </div>

      <div class="form-group">
        <label for="resultado" id="labelHighlight" class="text-white">Highlight</label>
        <div class="text-white" id="highlightText" style="font-size:30px;"></div>
      </div>
    </form>

    <div class="form-group">
      <textarea class="form-control form-control-sm" rows="5" id="comment"></textarea>
    </div>
    <br />

    <script src="js/regex.js"></script>
  </div>
</body>

</html>

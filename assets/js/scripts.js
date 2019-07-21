jQuery(document).ready(function () {

    /*
        Fullscreen background
    */
    $.backstretch("assets/img/backgrounds/1.jpg");

    $('#top-navbar-1').on('shown.bs.collapse', function () {
        $.backstretch("resize");
    });
    $('#top-navbar-1').on('hidden.bs.collapse', function () {
        $.backstretch("resize");
    });

    /*
        Form
    */
    $('.registration-form fieldset:first-child').fadeIn('slow');

    $('.registration-form input[type="text"], .registration-form input[type="password"], .registration-form textarea').on('focus', function () {
        $(this).removeClass('input-error');
    });

    // next step
    $('.registration-form .btn-next').on('click', function () {
        var parent_fieldset = $(this).parents('fieldset');
        var next_step = true;

        parent_fieldset.find('input[type="text"], input[type="password"], textarea').each(function () {
            if ($(this).val() == "") {
                $(this).addClass('input-error');
                next_step = false;
            } else {
                $(this).removeClass('input-error');
            }
        });

        if (next_step) {
            parent_fieldset.fadeOut(400, function () {
                $(this).next().fadeIn();
            });
        }

    });

    // previous step
    $('.registration-form .btn-previous').on('click', function () {
        $(this).parents('fieldset').fadeOut(400, function () {
            $(this).prev().fadeIn();
        });
    });

    errors = [];

    // submit
    $('.registration-form').on('submit', function (e) {
      

        //variables from question 1 
        var domInaes = document.forms["registration-form"]["form-dom-inaes"].value;
        var domAfip = document.forms["registration-form"]["form-dom-afip"].value;
        var domRentas = document.forms["registration-form"]["form-dom-rentas"].value;
        if (domInaes != domAfip || domInaes != domRentas) {
          errors.push([1, "Los domicilios no coinciden."]);
        }
    
        //variables from question 2 
        var otorgMatricula = new Date(document.forms["registration-form"]["form-otorg-matricula"].value);
        var inscAfip = new Date(document.forms["registration-form"]["form-insc-afip"].value);
        var altaIva = new Date(document.forms["registration-form"]["form-alta-iva"].value);
        var altaGanancias = new Date(document.forms["registration-form"]["form-alta-ganancias"].value);
        var altafpc = new Date(document.forms["registration-form"]["form-alta-fpc"].value);
        var inscRentas = new Date(document.forms["registration-form"]["form-insc-rentas"].value);
        if (!(otorgMatricula < inscAfip && otorgMatricula < inscRentas )){
            errors.push([2, "La fecha de otorgamiento de las matrículas debe ser anterior a la del inicio de actividades en AFIP y RENTAS."]);
        }
        inscAfip.getMonth();
        if (altaIva.getMonth() - inscAfip.getMonth() < 2 || 
            altaGanancias.getMonth() - inscAfip.getMonth() || 
            altafpc.getMonth() - inscAfip.getMonth() < 2){
            errors.push([2, "La fecha de alta en los impuestos no se ha realizado, en todos lo casos, dentro de los dos meses del inicio de actividades en AFIP."]);
        }
       
        //variables from question 3 
        var cierreEstatuto = document.forms["registration-form"]["form-cierre-esta"].value;
        var cierreAfip = document.forms["registration-form"]["form-cierre-afip"].value;
        if (cierreEstatuto != cierreAfip) {
            errors.push([3, "Las fechas de cierre de ejercicio no coincide con la informada a AFI."]);
        }

        //variables from question 4 
        var fechaRubDiario = document.forms["registration-form"]["fecha-rub-diario"].value;
        var fechaRegDiario = document.forms["registration-form"]["fecha-reg-diario"].value;
        var fechaRubinvBal = document.forms["registration-form"]["fecha-rub-invBal"].value;
        var fechaReginvBal = document.forms["registration-form"]["fecha-reg-invBal"].value;

        var fechaRubactAsam = document.forms["registration-form"]["fecha-rub-actAsam"].value;
        var fechaRegactAsam = document.forms["registration-form"]["fecha-reg-actAsam"].value;
        var fechaRubactAdm = document.forms["registration-form"]["fecha-rub-actAdm"].value;
        var fechaRegactAdm = document.forms["registration-form"]["fecha-reg-actAdm"].value;

        var fechaRubasoc = document.forms["registration-form"]["fecha-rub-asoc"].value;
        var fechaRegasoc = document.forms["registration-form"]["fecha-reg-asoc"].value;
        var fechaRubaudit = document.forms["registration-form"]["fecha-rub-audit"].value;
        var fechaRegaudit = document.forms["registration-form"]["fecha-reg-audit"].value;

        var fechaRubsind = document.forms["registration-form"]["fecha-rub-sind"].value;
        var fechaRegsind = document.forms["registration-form"]["fecha-reg-sind"].value;
        var fechaRubIVAComp = document.forms["registration-form"]["fecha-rub-IVAComp"].value;
        var fechaRegIVAComp = document.forms["registration-form"]["fecha-reg-IVAComp"].value;

        var fechaRubIVAVent = document.forms["registration-form"]["fecha-rub-IVAVent"].value;
        var fechaRegIVAVent = document.forms["registration-form"]["fecha-reg-IVAVent"].value;
        var fechaRubasistAsamb = document.forms["registration-form"]["fecha-rub-asistAsamb"].value;
        var fechaRegasistAsamb = document.forms["registration-form"]["fecha-reg-asistAsamb"].value;


        if (!(fechaRegDiario > fechaRubDiario && fechaReginvBal > fechaRubinvBal &&
            fechaRegactAsam > fechaRubactAsam && fechaRegactAdm > fechaRubactAdm &&
            fechaRegasoc > fechaRubasoc && fechaRegaudit > fechaRubaudit &&
            fechaRegsind > fechaRubsind && fechaRegIVAComp > fechaRubIVAComp &&
            fechaRegIVAVent > fechaRubIVAVent && fechaRegasistAsamb > fechaRubasistAsamb)) {
            errors.push([4, "La fecha del primer registro de uno o mas libros es anterior a la fecha de rúbrica."]);
        }

        //variables from question 5 
        var formBalaCheck1 = document.getElementById("form-bala-check1");
        var formBalaCheck2 = document.getElementById("form-bala-check2");
        var formBalaCheck3 = document.getElementById("form-bala-check3");
        var formBalaCheck4 = document.getElementById("form-bala-check4");
        var formBalaCheck5 = document.getElementById("form-bala-check5");
        var formBalaCheck6 = document.getElementById("form-bala-check6");
        var formBalaCheck7 = document.getElementById("form-bala-check7");
        var formBalaCheck8 = document.getElementById("form-bala-check8");
        var formBalaCheck9 = document.getElementById("form-bala-check9");
        var formBalaCheck10 = document.getElementById("form-bala-check10");

        if (!(formBalaCheck1.checked && formBalaCheck2.checked && formBalaCheck3.checked &&
            formBalaCheck4.checked && formBalaCheck5.checked && formBalaCheck6.checked &&
            formBalaCheck7.checked && formBalaCheck8.checked && formBalaCheck9.checked &&
            formBalaCheck10.checked)) {
            errors.push([5, "Uno o mas libros no están al dia."]);
        }

        //variables from question 6 
        var fechaRegLibroDiario = document.getElementById("fechaReg-libro-diario").value;
        var fechaRegFechaRubDiario = document.getElementById("fechaReg-FechaRub-diario").value;
        var fechaRegFechaRegDiario = document.getElementById("fechaReg-FechaReg-diario").value;

        var fechaRegLibroInvBal = document.getElementById("fechaReg-libro-invBal").value;
        var fechaRegFechaRubInvBal = document.getElementById("fechaReg-FechaRub-invBal").value;
        var fechaRegFechaRegInvBal = document.getElementById("fechaReg-FechaReg-invBal").value;

        var fechaRegLibroActAsambl = document.getElementById("fechaReg-libro-actAsambl").value;
        var fechaRegFechaRubActAsambl = document.getElementById("fechaReg-FechaRub-actAsambl").value;
        var fechaRegFechaRegActAsambl = document.getElementById("fechaReg-FechaReg-actAsambl").value;

        var fechaRegLibroActAdmin = document.getElementById("fechaReg-libro-actAdmin").value;
        var fechaRegFechaRubActAdmin = document.getElementById("fechaReg-FechaRub-actAdmin").value;
        var fechaRegFechaRegActAdmin = document.getElementById("fechaReg-FechaReg-actAdmin").value;

        var fechaRegLibroRegAsoc = document.getElementById("fechaReg-libro-regAsoc").value;
        var fechaRegFechaRubRegAsoc = document.getElementById("fechaReg-FechaRub-regAsoc").value;
        var fechaRegFechaRegRegAsoc = document.getElementById("fechaReg-FechaReg-regAsoc").value;

        var fechaRegLibroInfAudit = document.getElementById("fechaReg-libro-infAudit").value;
        var fechaRegFechaRubInfAudit = document.getElementById("fechaReg-FechaRub-infAudit").value;
        var fechaRegFechaRegInfAudit = document.getElementById("fechaReg-FechaReg-infAudit").value;

        var fechaRegLibroInfSind = document.getElementById("fechaReg-libro-infSind").value;
        var fechaRegFechaRubInfSind = document.getElementById("fechaReg-FechaRub-infSind").value;
        var fechaRegFechaRegInfSind = document.getElementById("fechaReg-FechaReg-infSind").value;

        var fechaRegLibroIVACompras = document.getElementById("fechaReg-libro-ivaCompras").value;
        var fechaRegFechaRubIVACompras = document.getElementById("fechaReg-FechaRub-ivaCompras").value;
        var fechaRegFechaRegIVACompras = document.getElementById("fechaReg-FechaReg-ivaCompras").value;

        var fechaRegLibroIVAventas = document.getElementById("fechaReg-libro-ivaventas").value;
        var fechaRegFechaRubIVAventas = document.getElementById("fechaReg-FechaRub-ivaventas").value;
        var fechaRegFechaRegIVAventas = document.getElementById("fechaReg-FechaReg-ivaventas").value;

        var fechaRegLibroAsistAsambl = document.getElementById("fechaReg-libro-asistAsambl").value;
        var fechaRegFechaRubAsistAsambl = document.getElementById("fechaReg-FechaRub-asistAsambl").value;
        var fechaRegFechaRegAsistAsambl = document.getElementById("fechaReg-FechaReg-asistAsambl").value;

        if (fechaRegLibroDiario ==  " " ||
            fechaRegLibroInvBal == " " || fechaRegLibroActAsambl == " " ||
            fechaRegLibroActAdmin == " " || fechaRegLibroRegAsoc == " " || fechaRegLibroInfAudit == " " ||
            fechaRegLibroInfSind == " " || fechaRegLibroIVACompras == " " || fechaRegLibroIVAventas == " " ||
            fechaRegLibroAsistAsambl == " ") {
            errors.push([6, "Hay campos en blanco."]);
        }

        if (fechaRegFechaRegInvBal < fechaRegFechaRubInvBal ||
            fechaRegFechaRegActAsambl < fechaRegFechaRubActAsambl || 
            fechaRegFechaRegActAdmin < fechaRegFechaRubActAdmin ||
            fechaRegFechaRegRegAsoc < fechaRegFechaRubRegAsoc || 
            fechaRegFechaRegInfAudit < fechaRegFechaRubInfAudit ||
            fechaRegFechaRegInfSind < fechaRegFechaRubInfSind || 
            fechaRegFechaRegIVACompras < fechaRegFechaRubIVACompras ||
            fechaRegFechaRegIVAventas < fechaRegFechaRubIVAventas ||
            fechaRegFechaRegAsistAsambl < fechaRegFechaRubAsistAsambl) {
                errors.push([6, "Alguno de los libros no posee hojas en blanco suficientes. Considere rubricar un nuevo libro."]);
        }


        //variables from question 7 
        var revMem = document.getElementById("rev-mem");

        if (!revMem.checked) {
            errors.push([7, "No ha sido verificado el formato de las memorias."]);
        }


        //variables from question 8 
        var añoAsambl1 = document.getElementById("año-asambl1").value;
        var fechaCierreEjer1 =new Date(document.getElementById("fecha-cierre-ejer1").value);
        var fechaCierreAsambl1 = new Date(document.getElementById("fecha-cierre-asambl1").value);
        var añoAsambl2 = document.getElementById("año-asambl2");
        var fechaCierreAsambl2 = new Date(document.getElementById("fecha-cierre-asambl2").value);
        var fechaCierreEjer2 = new Date(document.getElementById("fecha-cierre-ejer2").value);

        var añoAsambl3 = document.getElementById("año-asambl3");
        var fechaCierreEjer3 = new Date(document.getElementById("fecha-cierre-ejer3").value);
        var fechaCierreAsambl3 = new Date(document.getElementById("fecha-cierre-asambl3").value);

        if (fechaCierreEjer1 > fechaCierreAsambl1 || 
            fechaCierreEjer2 > fechaCierreAsambl2 || 
            fechaCierreEjer3 > fechaCierreAsambl3) {
                errors.push([8, "Se registran inconsistencias en las fechas de asambleas en alguno/s de los tres útimos períodos."]);
        }
 
        fechaCierreEjer1.setMonth(fechaCierreEjer1.getMonth() + 4);
        fechaCierreEjer2.setMonth(fechaCierreEjer2.getMonth() + 4);
        fechaCierreEjer3.setMonth(fechaCierreEjer3.getMonth() + 4);

       if (fechaCierreEjer1 < fechaCierreAsambl1 || 
            fechaCierreEjer2 < fechaCierreAsambl2 || 
            fechaCierreEjer3 < fechaCierreAsambl3) {
                errors.push([8, "Una o mas asambleas no se han realizado dentro de los 4 meses de cerrado el ejercicio."]);
        }


        //variables from question 9 
        var formActReal = document.getElementById("form-act-real").value;
        var formActAfip = document.getElementById("form-act-afip").value;
        var formActRentas = document.getElementById("form-act-rentas").value;
        if (!(formActReal == formActAfip && formActRentas == formActAfip)) {
            errors.push([9, "La actividad real de la Cooperativa no coincide con la declarada en AFIP y Rentas."]);
        }

        //variables from question 10 
        var constAfipIva = document.getElementById("const-afip-iva");
        var constAfipImpgan = document.getElementById("const-afip-impgan");
        var constAfipEduprom = document.getElementById("const-afip-eduprom");

        if (!constAfipIva.checked) {
            errors.push([10, "Falta inscripción en impuesto: IVA."]);
        }
        if (!constAfipImpgan.checked) {
            errors.push([10, "Falta inscripción en impuesto: Impuesto a las ganancias."]);
        }
        if (!constAfipEduprom.checked) {
            errors.push([10, "Falta inscripción en impuesto: Fondo para educación y promoción cooperativa."]);
        }


        //variables from question 11 
        var verClaveFisc = document.getElementById("ver-clave-fiscal");
        if (!verClaveFisc.checked) {
            errors.push([11, "No se ha verificado que la clave fiscal de la Cooperativa esté asociada a la del presidente actual."]);
        }

        //variables from question 12 
        var verMonotrib = document.getElementById("ver-monotributo");
        if (!verMonotrib.checked) {
            errors.push([12,"No se ha corroborado la inscripcion al monotributo de los asociados a la Cooperativa."]);
        }

        //variables from question 13 
        var verDeclJurada = document.getElementById("ver-decl-jurada");
        if (!verDeclJurada.checked) {
            errors.push([13, "No se ha verificado si se presentó la declaración jurada anual del Fondo de promoción y Educación Cooperativa."]);
        }

        //variables from question 14
        var verInfFinFisc = document.getElementById("ver-informe-finfisc");
        if (!verInfFinFisc.checked) {
            errors.push([14, "Informe anual para fines fiscales no verificado."]);
        }

        //variables from question 15 
        var verExcenGan = document.getElementById("ver-excencion-gan");
        if (!verExcenGan.checked) {
            errors.push([15, "No se ha verificado la excensión del impuesto a las ganancias."]);
        }

        //variables from question 16 
        var verConvMul = document.getElementById("ver-conv-mult");
        if (!verConvMul.checked) {
            errors.push([16, "No se ha corroborado que la cooperativa se encuentra inscripta en el Convenio Multilateral."]);
        }

        //variables from question 17 
        var verExcenArba = document.getElementById("ver-excencion-arba");
        if (!verExcenArba.checked) {
            errors.push([17, "No se ha corroborado el trámite de exención de ingresos brutos."]);
        }


        //variables from question 18
        var verExcenAgip = document.getElementById("ver-excencion-agip");
        if (!verExcenAgip.checked) {
            errors.push([18, "No se ha corroborado el trámite de exención de ingresos brutos."]);
        }

        //TODO : que verificamos aca? 
        //variables from question 19
        var formNotaInaes = document.forms["registration-form"]["form-nota-inaes"].value;
        var formFechaAsam = document.forms["registration-form"]["form-fecha-asam"].value;
        if (formNotaInaes > formFechaAsam) {
            errors.push([19, "La nota de Inaes no fue realizada con una antelación de por lo menos 15 días."]);
        }

    
        //variables from question 20 
        var formInaesMem = document.getElementById("form-inaes-mem");
        var formInaesBalan = document.getElementById("form-inaes-balan");
        var formInaesAsamb = document.getElementById("form-inaes-asamb");
        var formInaesDecljur = document.getElementById("form-inaes-decljur");
        var formInaesSindic = document.getElementById("form-inaes-sindic");

        if (!(formInaesMem.checked && formInaesBalan.checked && 
            formInaesAsamb.checked && formInaesDecljur.checked && 
            formInaesSindic.checked)) {
            errors.push([20, "La información necesaria sobre la última asamblea no ha sido remitida a INAES."]);
        }
        //variables from question 21 
        var verInaes = document.getElementById("ver-inaes");
        if (!verInaes.checked) {
            errors.push([21, "No se ha verificado que se haya realizado la transmisión electrónica de los datos del balance anual."]);
        }


        //variables from question 22
        var verTalon = document.getElementById("ver-talonarios");
        if (!verTalon.checked) {
            errors.push([22, "No se ha verificado que el llenado total de los talonarios de facturas, recibos, remitos."]);
        }

        //variables from question 23
        var verConstAfip = document.getElementById("ver-const-afip");
        if (!verConstAfip.checked) {
            errors.push([23, "No se ha verificado que todos los clientes a los que se le hacen facturas A tengan su constanca de inscripción en AFIP y que no sean monotributistas."]);
        }

        //variables from question 24 
        var verPagRecib = document.getElementById("ver-pag-recib");
        if (!verPagRecib.checked) {
            errors.push([24, "No se ha verificado que los retiros sean pagados con un recibo."]);
        }



        var lMargin=15; //left margin in mm
        var rMargin=15; //right margin in mm
        var pdfInMM=210;  // width of A4 in mm

        alert("Se han detectado "+errors.length+" puntos que debe corregir")

        var razonSocial = "Cooperativa " + document.forms["registration-form"]["form-razon-social"].value;
        var title = [razonSocial, "Informe de autodiagnóstico"] 

        var doc = new jsPDF("p","mm","a4");
        
       // var img = 'assets/img/coop.jpg;base64,verylongbase64;';        

        doc.setFontSize(22);
        var splitTitle = doc.splitTextToSize(title, (pdfInMM-lMargin-rMargin));
        doc.text(lMargin,20,splitTitle);
       // doc.addImage(img, 'JPEG', 15, 40, 180, 180);

        var y = 20 + splitTitle.length * 10;
        doc.setFontSize(13);
        errors.forEach(function(e) {
            var text =  e[0] + ": " + e[1];
            var lines =doc.splitTextToSize(text, (pdfInMM-lMargin-rMargin));
            doc.text(lMargin, y, lines);
            
            if (y>=280){
                doc.addPage("a4","p");
                y=10;
            }
            y = y + 6.75 * lines.length;
          });
        doc.save('Informe autodiagnóstico.pdf');
        window.location.href = 'https://pdfend.com/';
    });


});
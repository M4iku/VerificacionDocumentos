import {Component, OnInit} from '@angular/core';
import {ButtonModule} from 'primeng/button';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {SolicitudService} from './solicitud.service';
import {formatDate} from '@angular/common';

interface DTE {
  name: string;
  code: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  docs: DTE[];
  selectedDoc: DTE;
  es: any;
  date2: Date;
  pdfSrc: object;
  DTEForm: FormGroup;

  constructor(private fb: FormBuilder,
              private cn: SolicitudService) {
      this.docs = [
          {name: 'Boleta Electronica', code: '39'},
          {name: 'Factura Electronica', code: '33'}
      ];
      this.selectedDoc = this.docs[0];
  }

  ngOnInit() {
      this.es = {
          firstDayOfWeek: 1,
          dayNames: [ 'domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado' ],
          dayNamesShort: [ 'dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb' ],
          dayNamesMin: [ 'D', 'L', 'M', 'X', 'J', 'V', 'S' ],
          monthNames: [ 'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre',
              'noviembre', 'diciembre'],
          monthNamesShort: [ 'ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic' ],
          today: 'Hoy',
          clear: 'Borrar'
      };

      this.DTEForm = new FormGroup({
          TipoDocumento: new FormControl(''),
          Monto: new FormControl('23040'),
          RutEmpresa: new FormControl('76150964-0'),
          Folio: new FormControl('11'),
          Fecha: new FormControl('29-10-2018')
      });

      this.DTEForm.controls['TipoDocumento'].setValue(this.docs[0].code);
  }

  solicitarPDF() {
      this.DTEForm.controls['Fecha'].setValue(this.date2.toJSON().slice(0, 10));
      const jsonv = JSON.stringify(this.DTEForm.getRawValue());
      console.log(jsonv);
      this.cn.SolicitarPDF(jsonv).subscribe(dt => {
          const file = new Blob([dt], {type: 'application/pdf'});
          this.pdfSrc = URL.createObjectURL(file) as any;
      });
  }

  changeTipoDocumento(value: DTE) {
      this.DTEForm.controls['TipoDocumento'].setValue(value.code);
      console.log('test');
      console.log('test');
  }

}

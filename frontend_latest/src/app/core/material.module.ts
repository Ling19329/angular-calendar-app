import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    MatButtonModule, MatNativeDateModule, MatIconModule, MatSidenavModule, MatListModule, MatToolbarModule, MatFormFieldModule,
    MatInputModule,MatDatepickerModule, MatDialogModule, MatTableModule, MatSelectModule, MatCardModule,


} from '@angular/material';

@NgModule({
    imports: [
        CommonModule,
        MatButtonModule,
        MatNativeDateModule,
        MatIconModule,
        MatSidenavModule,
        MatListModule,
        MatToolbarModule,
        MatFormFieldModule,
        MatInputModule,
        MatDatepickerModule,
        MatDialogModule,
        MatTableModule,
        MatSelectModule,
        MatCardModule
    ],
    exports: [
        CommonModule,
        MatButtonModule,
        MatNativeDateModule,
        MatIconModule,
        MatSidenavModule,
        MatListModule,
        MatToolbarModule,
        MatFormFieldModule,
        MatInputModule,
        MatDatepickerModule,
        MatDialogModule,
        MatTableModule,
        MatSelectModule,
        MatCardModule
    ]
})

export class CustomMaterialModule {

}

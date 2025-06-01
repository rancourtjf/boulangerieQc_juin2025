import { Component, inject, Input, input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartModule } from 'primeng/chart';
import { ExtractLienFTPService } from '../../extract-lien-ftp.service';
@Component({
    selector: 'app-graphic',
    standalone: true,
    imports: [ChartModule,
        CommonModule],
    templateUrl: './graphic.component.html',
    styleUrl: './graphic.component.css'
})
export class GraphicComponent implements OnInit {
    extract = inject(ExtractLienFTPService)
    nomProduit: string = ""

    basicData: any;
    data: any;
    dataPie: any
    basicOptions: any;
    options: { cutout: string; plugins: { legend: { labels: { color: string; }; }; }; };
    optionsPie: any

    sommeSelectionDate1: number
    sommeSelectionDate2: number
    sommeSelectionDate3: number
    sommeSelectionDate4: number

    startEnd1: string
    startEnd2: string
    startEnd3: string
    startEnd4: string

    ngOnInit(): void {

        this.nomProduit = this.extract.unProduit
        this.sommeSelectionDate1 = this.extract.sommeSelectionDate1;
        this.sommeSelectionDate2 = this.extract.sommeSelectionDate2;
        this.sommeSelectionDate3 = this.extract.sommeSelectionDate3;
        this.sommeSelectionDate4 = this.extract.sommeSelectionDate4;

        this.startEnd1 = this.extract.startEnd1
        this.startEnd2 = this.extract.startEnd2
        this.startEnd3 = this.extract.startEnd3
        this.startEnd4 = this.extract.startEnd4

        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

        this.basicData = {
            //labels: ['Q1', 'Q2', 'Q3', 'Q4'],
            labels: [this.startEnd1, this.startEnd2, this.startEnd3, this.startEnd4],
            datasets: [
                {
                    label: 'Ventes $',
                    // data: [540, 325, 702, 620],
                    data: [this.sommeSelectionDate1, this.sommeSelectionDate2, this.sommeSelectionDate3, this.sommeSelectionDate4],

                    backgroundColor: ['rgba(255, 159, 64, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(153, 102, 255, 0.2)'],
                    borderColor: ['rgb(255, 159, 64)', 'rgb(75, 192, 192)', 'rgb(54, 162, 235)', 'rgb(153, 102, 255)'],
                    borderWidth: 1
                }
            ]
        };
        this.data = {
            labels: [this.startEnd1, this.startEnd2, this.startEnd3, this.startEnd4],
            datasets: [
                {
                    label: 'Ventes ',
                    data: [this.sommeSelectionDate1, this.sommeSelectionDate2, this.sommeSelectionDate3, this.sommeSelectionDate4],

                    backgroundColor: [documentStyle.getPropertyValue('--blue-500'), documentStyle.getPropertyValue('--yellow-500'), documentStyle.getPropertyValue('--green-500'), documentStyle.getPropertyValue('--red-500')],
                    hoverBackgroundColor: [documentStyle.getPropertyValue('--blue-400'), documentStyle.getPropertyValue('--yellow-400'), documentStyle.getPropertyValue('--green-400'), documentStyle.getPropertyValue('--red-500')]
                }
            ]
        };
        this.basicOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                },
                x: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                }
            }
        };
        this.options = {
            cutout: '60%',
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            }
        };
        this.dataPie = {
            labels: [this.startEnd1, this.startEnd2, this.startEnd3, this.startEnd4],
            datasets: [
                {
                    label: 'Ventes 3 mois',
                    data: [this.sommeSelectionDate1, this.sommeSelectionDate2, this.sommeSelectionDate3, this.sommeSelectionDate4],

                    backgroundColor: [documentStyle.getPropertyValue('--blue-500'), documentStyle.getPropertyValue('--yellow-500'), documentStyle.getPropertyValue('--green-500'), documentStyle.getPropertyValue('--red-500')],
                    hoverBackgroundColor: [documentStyle.getPropertyValue('--blue-400'), documentStyle.getPropertyValue('--yellow-400'), documentStyle.getPropertyValue('--green-400'), documentStyle.getPropertyValue('--red-500')]
                }
            ]
        };
        this.optionsPie = {
            plugins: {
                legend: {
                    labels: {
                        usePointStyle: true,
                        color: textColor
                    }
                }
            }
        };
    }
}



import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Color, palette, Palette } from 'src/styles/theme';

@Component({
  selector: 'app-typography',
  templateUrl: './typography.component.html',
  styleUrls: ['./typography.component.scss'],
  standalone : true,
  imports : [CommonModule]
})
export class TypographyComponent {

  public palette: Color = palette;

  @Input() color: Palette = 'text';
  @Input() fontSize!: number;
  @Input() bold!: number;
  @Input() align!: 'center' | 'right' | 'left';

  constructor() {}

  ngOnInit(): void {
    this.color = this.color || 'text';
    this.fontSize = this.fontSize || 2;
    this.align = this.align || 'left'
  }
}

from django.contrib import admin
from .models import About


# Register your models here.
@admin.register(About)
class AboutAdmin(admin.ModelAdmin):
    """
    Admin interface for the About model.
    """
    list_display = ('title', 'created_at', 'updated_at')
    search_fields = ('title',)
    ordering = ('-created_at',)
    readonly_fields = ('created_at', 'updated_at')

    fieldsets = (
        (None, {
            'fields': ('title', 'content')
        }),
        ('Metadata', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )


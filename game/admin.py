from django.contrib import admin
from .models import GameScore


# Register your models here.
@admin.register(GameScore)
class GameScoreAdmin(admin.ModelAdmin):
    """
    Admin interface for the GameScore model.
    """
    list_display = ('user', 'score', 'level', 'created_at')
    search_fields = ('user', 'level')
    ordering = ('user', 'level', 'score', '-created_at',)
    readonly_fields = ('user', 'score', 'level', 'created_at')

    # fieldsets = (
    #     (None, {
    #         'fields': ('user', 'score', 'level', 'created_at')
    #     }),
    # )
